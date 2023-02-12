import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreatePageContext } from "../../../lib/CreatePageContext";
import styles from "../../../styles/createPage/form.module.css";
import { dataType } from "../../../lib/types";
import Slider from "../tools/ValueSlider";

export default function WithinRangeQuestion() {
  const { setQuestionPageNum, setEvents, setPhantomNodes, events} =
    useContext(CreatePageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("valueSlider", 0);
  }, [setValue]);

  function prevButtonClicked() {
    setEvents((prev) => prev.slice(0, -1));
    setQuestionPageNum(2);
  }

  function onSubmit(data: dataType) {
    setQuestionPageNum(5);
    setEvents((prev) => [
      ...prev.slice(0, -1),
      { ...prev.slice(-1)[0], overallValue: data.valueSlider },
    ]);
    var node1: any;
    var node2: any;
    if (events.length === 2) {
      // If it is the first period
      node1 = {
        xValue: events.slice(-2)[0].bigEvent + 1,
        yValue: data.valueSlider,
      };
      setPhantomNodes((prev) => [...prev, node1]);
    } else {
      if (events.slice(-2)[0].bigEvent + 1 !== events.slice(-1)[0].bigEvent) {
        // If the two consecutive events are not a year difference
        node1 = {
          xValue: events.slice(-2)[0].bigEvent,
          yValue: data.valueSlider,
        };
      }
      setPhantomNodes((prev) => [...prev, node1]);
    }
    node2 = {
      xValue: events.slice(-1)[0].bigEvent - 1,
      yValue: data.valueSlider,
    };
    setPhantomNodes((prev) => [...prev, node2]);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={prevButtonClicked}>
        Prev
      </button>
      <div className={styles.subContainer}>
        <label className={styles.label}>
          What is the overall satisfactory value within this range of years?
        </label>
        <div style={{ width: "50%" }}>
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
        </div>
      </div>
      <input
        className={`${styles.button} ${styles.right}`}
        type="submit"
        value="Next"
      />
    </form>
  );
}
