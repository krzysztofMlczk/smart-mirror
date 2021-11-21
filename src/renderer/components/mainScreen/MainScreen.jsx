import React, { useState, useContext } from 'react';
import GridLayout from 'react-grid-layout';

import UserContext from 'renderer/context/UserContext';
import useWindowDimensions from 'renderer/hooks/useWindowDimensions';
import TopBar from './TopBar';
import LayoutEditingSnackbar from './LayoutEditingSnackbar';
import WidgetContainer from '../widgets/WidgetContainer';
import SettingsDrawer from './SettingsDrawer';
import { widgetIds, widgetIdToComponent } from '../widgets/widgetIdMap';

/**
 * The `react-grid-layout` lib is not swapping items during horizontal dragover
 * Rather it moves the items into a new row
 * Since we need a static 3x3 row, let's fix that
 */
const fixLayout = (layout) => {
  // `y` is calculated by `h` in the layout object, since `h` is 20
  // first row will be 0, second 20, third 40
  const maxY = 2;

  const combinations = [
    '0 0',
    '0 1',
    '0 2',
    '1 0',
    '1 1',
    '1 2',
    '2 0',
    '2 1',
    '2 2',
  ];
  const occupied = layout.map((item) => `${item.x} ${item.y}`);
  let firstFree = combinations.filter((pair) => !occupied.includes(pair))[0];
  if (firstFree) {
    firstFree = firstFree.split(' ').map((i) => parseInt(i, 10));
  }

  // bring the item from the new row into maxY row
  // and place it in the missing column
  const fixedLayout = layout.map((item) => {
    if (firstFree && item.y > maxY) {
      const fixedItem = {
        ...item,
        y: firstFree[1],
        x: firstFree[0],
      };
      return fixedItem;
    }
    return item;
  });
  return fixedLayout;
};

/**
 *
 * @param availableWidgets = {
 *  calendar: 'calendar',
 *  clock: 'clock',
 *  compliment: 'compliment',
 *  currencies: 'currencies',
 *  mailbox: 'mailbox',
 *  weather: 'weather',
 * }
 * @param userLayout = [
  { i: 'calendar', x: 0, y: 0, w: 1, h: 1, isResizable: false },
  { i: 'clock', x: 1, y: 0, w: 1, h: 1, isResizable: false },
  { i: 'compliment', x: 2, y: 0, w: 1, h: 1, isResizable: false },
];
 */
const computeToolBoxItems = (availableWidgets, userLayout) => {
  const userWidgets = userLayout.map((it) => it.i);
  const outcome = Object.values(availableWidgets).filter(
    (x) => userWidgets.indexOf(x) === -1
  );
  console.log(outcome);
  // return undefined;
  return outcome;
};

const MainScreen = () => {
  const { userData } = useContext(UserContext);
  // initial layout should be fetched from database (it is stored in context)
  const [layout, setLayout] = useState(userData.layout);
  // used to restore previous layout when user exits the editing mode
  const [previousLayout, setPreviousLayout] = useState(null);
  const [editingLayout, setEditingLayout] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // TODO: toolbox must have all of the remaining widgets that are not displayed!
  // initial toolBoxItems should be calculated based on available widgets and user's layout
  const [toolBoxItems, setToolBoxItems] = useState(
    () => computeToolBoxItems(widgetIds, userData.layout)
    // []
  );
  // used to restore previous toolBox state when user exits the editing mode
  const [previousToolBoxItems, setPreviousToolBoxItems] = useState(null);
  const { height, width } = useWindowDimensions();
  const gridSize = { rows: 3, cols: 3 };
  const maxWidgetsAmount = gridSize.rows * gridSize.cols;

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  /**
   * Adds widget selected from the toolbox to the current layout
   * (widget becomes visible on the screen)
   *
   * @param {*} selectedItem - id of a widget that should be displayed
   */
  const onTakeItem = (selectedItem) => {
    setToolBoxItems((prevState) =>
      prevState.filter((item) => item !== selectedItem)
    );
    setLayout((prevState) => [
      ...prevState,
      { i: selectedItem, x: 0, y: 0, w: 1, h: 1, isResizable: false },
    ]);
  };

  /**
   * Removes widget from the layout and puts its icon in the toolbox
   * (widget stops beign visible on the screen)
   *
   * @param {*} removedItem - id of a widget that should be removed from the layout
   */
  const onPutItem = (removedItem) => {
    setToolBoxItems((prevState) => [...prevState, removedItem]);
    setLayout((prevState) => prevState.filter(({ i }) => i !== removedItem));
  };

  const startLayoutEditing = () => {
    setEditingLayout(true);
    setPreviousLayout(layout);
    setPreviousToolBoxItems(toolBoxItems);
    toggleDrawer();
  };

  const cancelLayoutEditing = () => {
    setLayout(previousLayout);
    setToolBoxItems(previousToolBoxItems);
    setEditingLayout(false);
  };

  const saveLayout = () => {
    window.middleware.db.users
      .updateUsersLayout(userData.userId, layout)
      .then(() => {
        console.log('saved Layout');
        setEditingLayout(false);
      })
      .catch((err) => console.log(err));
  };

  const restoreDefaultLayout = () => {
    const defaultLayout = window.middleware.db.defaults.layout;
    setLayout(defaultLayout);
    setToolBoxItems(computeToolBoxItems(widgetIds, defaultLayout));
    // save in the database
    window.middleware.db.users
      .updateUsersLayout(userData.userId, defaultLayout)
      .then(() => {
        console.log('Restored default layout');
      })
      .catch((err) => console.log(err));
    toggleDrawer();
  };

  const generateDOM = () => {
    return layout.map((l) => (
      <div key={l.i} style={{ border: '1px solid white' }}>
        <WidgetContainer
          /* eslint-disable react/jsx-no-bind */
          onRemove={onPutItem.bind(this, l.i)}
          editingLayout={editingLayout}
        >
          {React.createElement(widgetIdToComponent[l.i])}
        </WidgetContainer>
      </div>
    ));
  };

  return (
    <>
      <TopBar
        toggleDrawer={toggleDrawer}
        editingLayout={editingLayout}
        toolBoxDisabled={layout.length >= maxWidgetsAmount}
        toolBoxItems={toolBoxItems}
        onTakeItem={onTakeItem}
      />
      <LayoutEditingSnackbar
        isOpen={editingLayout}
        saveLayout={saveLayout}
        cancelLayoutEditing={cancelLayoutEditing}
      />
      <GridLayout
        className="layout"
        layout={layout}
        cols={gridSize.cols}
        maxRows={gridSize.rows}
        rowHeight={(height - 64) / 3}
        width={width}
        compactType={null}
        onLayoutChange={(e) => setLayout(fixLayout(e))}
        containerPadding={[0, 0]}
        margin={[0, 0]}
        isDraggable={editingLayout}
      >
        {generateDOM()}
      </GridLayout>
      <SettingsDrawer
        drawerOpen={drawerOpen}
        toggle={toggleDrawer}
        startLayoutEditing={startLayoutEditing}
        restoreDefaultLayout={restoreDefaultLayout}
      />
    </>
  );
};

export default MainScreen;
