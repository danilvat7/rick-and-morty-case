import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';

export type SearchInputRefType = {
  resetValue: () => void;
};
type Props = {
  defaultValue?: any;
  optionLabel?: string;
  options?: any;
  placeholder?: string;
  onChange?: (value: any) => void;
  onKeyUp?: (value: string) => void;
  debounceTime?: number;
};

/**
 * SearchInput component
 * Represents search autocomplete input
 * Wrapped in forwardRef to allow the parent component to reset the selected value
 */
const SearchInput = forwardRef<SearchInputRefType, Props>(
  (
    {
      defaultValue,
      optionLabel = 'name',
      placeholder,
      options = [],
      onChange = () => {},
      onKeyUp = () => {},
      debounceTime = 300,
    }: Props,
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || null);

    // debounces input onkeyup event
    // eslint-disable-next-line
    const debouncedOnKeyUp = useCallback(
      debounce((value: string) => onKeyUp(value), debounceTime),
      []
    );

    // handles on value select
    const onSelect = (value: any) => {
      onChange(value);
      setValue(value);
    };

    // shares methods with the parent component
    useImperativeHandle(ref, () => ({
      resetValue() {
        setValue(null);
      },
    }));

    return (
      <Autocomplete
        value={value}
        options={options}
        getOptionLabel={(option: any) => option[optionLabel]}
        onChange={(_, value) => onSelect(value)}
        onKeyUp={(e: any) => debouncedOnKeyUp(e.target.value)}
        renderInput={(params) => (
          <TextField {...params} label={placeholder} variant="outlined" />
        )}
      />
    );
  }
);

export default SearchInput;
