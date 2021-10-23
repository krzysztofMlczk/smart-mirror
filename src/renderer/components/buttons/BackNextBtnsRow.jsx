import React from 'react';

import BtnsRow from './BtnsRow';
import BackNextBtn from './BackNextBtn';

const BackNextBtnsRow = ({ marginTop, onBack, isNextDisabled, onNext }) => {
  return (
    <BtnsRow marginTop={marginTop}>
      <BackNextBtn variant="back" onClick={onBack}>
        Back
      </BackNextBtn>
      <BackNextBtn variant="next" disabled={isNextDisabled} onClick={onNext}>
        Next
      </BackNextBtn>
    </BtnsRow>
  );
};

export default BackNextBtnsRow;
