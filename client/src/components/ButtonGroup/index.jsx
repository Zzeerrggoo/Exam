import React, {useState} from 'react';
import ButtonGroupButton from './ButtonGroupButton';
import styles from './ButtonGroup.module.scss';

const buttons = [
  {
    value: 'asname',
    spanText: 'Yes',
    description: 'The Domain should exactly match the name',
  },
  {
    value: 'yes',
    spanText: 'Yes',
    description: 'But minor variations are allowed (Recommended)',
  },
  {
    value: 'no',
    spanText: 'No',
    description: 'I am only looking for a name, not a Domain',
  }];

const ButtonGroup = () => {

  const [value, setValue] = useState(buttons[1].value);

  return (
      <div className={styles.container}>
        <input type="hidden"
               value={value}/>
        {buttons.map(
            (button, index) =>
                <ButtonGroupButton key={index} {...button}
                                   onClick={setValue}
                                   currentButton={value}/>)}
      </div>
  );
};

export default ButtonGroup;