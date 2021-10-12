import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Container from '@material-ui/core/Container';

import BackNextBtnsRow from '../buttons/BackNextBtnsRow';

const getImageData = () => {
  const seed = 'jp2gmd';
  const sprites = ['bottts', 'jdenticon', 'gridy'];
  const imageData = [];
  sprites.forEach((sprite) => {
    for (let i = 1; i < 5; i += 1) {
      imageData.push(
        `https://avatars.dicebear.com/api/${sprite}/${seed.slice(0, i)}.svg`
      );
    }
  });
  return imageData;
};

const useStyles = makeStyles({
  selected: {
    borderWidth: '3px',
    borderColor: 'white',
    borderStyle: 'solid',
  },
  notSelected: {
    opacity: '0.7',
  },
});

const AvatarChooser = ({ next, back, avatar, saveAvatar }) => {
  // keeps id of currently selected avatar
  const [currentlySelected, setCurrentlySelected] = useState(avatar);
  const classes = useStyles();
  const imageData = getImageData();
  // styling for currently not selected items
  const notSelectedStyle = currentlySelected ? classes.notSelected : null;

  const onNext = () => {
    saveAvatar(currentlySelected);
    next();
  };

  const onBack = () => {
    saveAvatar(currentlySelected);
    back();
  };

  return (
    <Container maxWidth="sm">
      <ImageList rowHeight={140} cols={4} gap={8}>
        {imageData.map((url) => (
          <ImageListItem
            key={url}
            cols={1}
            onClick={() => setCurrentlySelected(url)}
            className={
              url === currentlySelected ? classes.selected : notSelectedStyle
            }
          >
            <img src={url} alt="Cannot Display" />
          </ImageListItem>
        ))}
      </ImageList>
      <BackNextBtnsRow
        marginTop="40px"
        onBack={onBack}
        isNextDisabled={!currentlySelected}
        onNext={onNext}
      />
    </Container>
  );
};

export default AvatarChooser;
