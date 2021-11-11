import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

import useWindowDimensions from 'renderer/hooks/useWindowDimensions';
import TopBar from './TopBar';
import LayoutEditingSnackbar from './LayoutEditingSnackbar';
import WidgetContainer from '../widgets/WidgetContainer';
import SettingsDrawer from './SettingsDrawer';
import { widgetIdToComponent } from '../widgets/widgetIdMap';

import defaultLayout from './defaultLayout';

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

const MainScreen = () => {
  // TODO: fetch layout into UserContext during login
  // use this layout as the initial value of layout state variable
  const [layout, setLayout] = useState(defaultLayout);
  // used to restore previous layout when user exits the editing mode
  const [previousLayout, setPreviousLayout] = useState(null);
  const [editingLayout, setEditingLayout] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // TODO: toolbox must have all of the remaining widgets that are not displayed!
  const [toolBoxItems, setToolBoxItems] = useState([]);
  // used to restore previous toolBox state when user exits the editing mode
  const [previousToolBoxItems, setPreviousToolBoxItems] = useState(null);
  const { height, width } = useWindowDimensions();
  const gridSize = { rows: 3, cols: 3 };

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const onTakeItem = (item) => {
    setToolBoxItems((prevState) => prevState.filter(({ i }) => i !== item.i));
    setLayout((prevState) => [...prevState, item]);
  };

  const onPutItem = (item) => {
    setToolBoxItems((prevState) => [...prevState, item]);
    setLayout((prevState) => prevState.filter(({ i }) => i !== item.i));
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
    // TODO: save layout in the database!
    console.log('saved Layout');
    setEditingLayout(false);
  };

  const generateDOM = () => {
    return layout.map((l) => (
      <div key={l.i} style={{ border: '1px solid white' }}>
        <WidgetContainer
          /* eslint-disable react/jsx-no-bind */
          onRemove={onPutItem.bind(this, l)}
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
        startLayoutEditing={startLayoutEditing}
      />
    </>
  );
};

export default MainScreen;
