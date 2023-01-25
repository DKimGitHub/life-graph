import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType, FormState } from "../../../lib/types";
import Slider from "../tools/ValueSlider";
import "../../../styles/slider.css";

export default function CreateForm(props: any) {
  const { updateUserInput, graphId, yearBorn } =
    useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(data: dataType) {
    updateUserInput((prev) => [
      ...prev,
      { xValue: yearBorn, yValue: data.valueSlider },
    ]);
    props.setIsFirstQuestion(false);
    props.setIsNextBigEvent(true);
    const options = {
      method: "POST",
      body: JSON.stringify({
        data: {
          graph: {
            connect: {
              id: graphId,
            },
          },
          title: "some title",
        },
      }),
    };
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        How content were you when you were born?
      </label>
      <Controller
        name="valueSlider"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Slider onChange={onChange} />
        )}
      />
      {errors.valueSlider && (
        <p style={{ display: "inline", color: "red" }}>
          {errors.valueSlider.message as string}
        </p>
      )}
      <input className={styles.button} type="submit" value="Next" />
    </form>
  );
}
