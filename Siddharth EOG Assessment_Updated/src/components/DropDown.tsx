import React from 'react';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: '300px',
	margin: '20px 10px'
  },
}));

type changeCallback = (event: any) => void;

type DropDownProps = {
  options: Array<string>;
  label: string;
  onSelectionChange: changeCallback;
};

export default ({ options, label, onSelectionChange }: DropDownProps) => {
  const classes = useStyles();
  const [chosen, setChosen] = React.useState<ValueType<OptionTypeBase,boolean>>([]);

  const handleSelectionChange = (selected: any) => {
    if (selected) {
      setChosen(selected);
      if (onSelectionChange) {
        const newSelection = selected.map((option: any) => {
          return option.label;
        });
        onSelectionChange(newSelection);
      }
    }
  };

  const selectOptions = options.map(option => {
    return { label: option, value: option };
  });

  return <Select className={classes.select} isMulti value={chosen} onChange={handleSelectionChange} options={selectOptions} />;
};
