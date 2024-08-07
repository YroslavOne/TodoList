import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import style from "./PrioritiesInput.module.css";
import { useEffect, useState } from "react";
import { fetchPriorities } from "../../store/priorities.slice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { PrioritiesInputProps } from "./PrioritiesInput.props";

function PrioritiesInput({ priority, setPriority }: PrioritiesInputProps) {
  const dispatch = useDispatch<AppDispatch>();
  const priorities = useSelector(
    (state: RootState) => state.priorities.priorities
  );
  const [selectedValue, setSelectedValue] = useState(priority);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setPriority(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    dispatch(fetchPriorities());
  }, [dispatch]);

	useEffect(() => {
    setSelectedValue(priority);
  }, [priority]);

  return (
    <div className={style["container"]}>
      <FormControl
        sx={{
          display: "flex",
        }}
      >
        <FormLabel
          sx={{
            display: "flex",
            fontFamily: "Montserrat",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "17.07px",
            textAlign: "left",
            color: "black",
          }}
          className={style["p"]}
        >
          Priority
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {priorities?.map((priority, index) => (
            <FormControlLabel
              key={index}
              sx={{
                marginRight: "50px",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "15.73px",
                textAlign: "left",
                color: "#A1A3AB",
              }}
              control={
                <Radio
                  sx={{
                    color: priority.color,
                    "&.Mui-checked": {
                      color: priority.color,
                    },
                  }}
                  {...controlProps(priority.name)}
                />
              }
              label={priority.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PrioritiesInput;
