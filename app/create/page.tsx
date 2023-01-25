"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import Graph from "../../components/createPage/Graph";
import Form from "../../components/createPage/questions/Questions";
import AgeModal from "../../components/createPage/modals/AgeModal";
import ContinueModal from "../../components/createPage/modals/ContinueModal";
import IntroModal from "../../components/createPage/modals/IntroModal";

import CreatePageContext from "../../lib/CreatePageContext";
import { FormState, DOBType } from "../../lib/types";
import styles from "../../styles/createPage/create.module.css";

export default function Page() {
  const [userInput, setUserInput] = useState<FormState[]>([]);
  const [graphId, setGraphId] = useState<string>("");
  const [yearBorn, setYearBorn] = useState<number>(NaN);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [nextBigEvent, setNextBigEvent] = useState<number>(NaN);

  useEffect(() => {
    const savedState = localStorage.getItem("savedPost");
    if (savedState) {
      setUserInput(JSON.parse(savedState).userInput);
      setGraphId(JSON.parse(savedState).graphId);
      setYearBorn(JSON.parse(savedState).yearBorn);
      setNextBigEvent(JSON.parse(savedState).nextBigEvent);
      setIsContinueModalOpen(true);
    } else {
      setIsContinueModalOpen(false);
      setIsIntroModalOpen(true);
      createPost();
    }
  }, []);

  useEffect(() => {
    const savedPost = {
      userInput: userInput,
      graphId: graphId,
      yearBorn: yearBorn,
      nextBigEvent: nextBigEvent,
    };
    localStorage.setItem("savedPost", JSON.stringify(savedPost));
  }, [userInput, graphId, yearBorn, nextBigEvent]);

  async function createPost() {
    const options = {
      method: "POST",
      body: JSON.stringify({
        data: {
          graph: {
            create: { isYear: false },
          },
        },
        include: {
          graph: {
            select: {
              id: true,
            },
          },
        },
      }),
    };
    const response = await fetch("/api/post", options);
    const data = await response.json();
    setGraphId(data.graph.id);
  }

  //Function sent through ContextProvider for changing the node states
  function updateUserInput(input: React.SetStateAction<FormState[]>) {
    setUserInput(input);
  }

  function updateYearBorn(input: React.SetStateAction<number>) {
    setYearBorn(input);
  }

  function updateNextBigEvent (input: React.SetStateAction<number>) {
    setNextBigEvent(input);
  }

  function updateIsAgeModalOpen(input: React.SetStateAction<boolean>) {
    setIsAgeModalOpen(input);
  }

  function updateIsContinueModalOpen(input: React.SetStateAction<boolean>) {
    setIsContinueModalOpen(input);
  }

  function updateIsIntroModalOpen(input: React.SetStateAction<boolean>) {
    setIsIntroModalOpen(input);
  }

  function reset() {
    localStorage.removeItem("savedPost");
    setUserInput([]);
    createPost();
    setIsIntroModalOpen(true);
  }

  return (
    <CreatePageContext
      userInput={userInput}
      updateUserInput={updateUserInput}
      graphId={graphId}
      yearBorn={yearBorn}
      nextBigEvent={nextBigEvent}
      updateYearBorn={updateYearBorn}
      updateNextBigEvent={updateNextBigEvent}
      updateIsContinueModalOpen={updateIsContinueModalOpen}
      updateIsAgeModalOpen={updateIsAgeModalOpen}
      updateIsIntroModalOpen={updateIsIntroModalOpen}
      reset={reset}>
      <AgeModal isModalOpen={isAgeModalOpen} />
      <ContinueModal isModalOpen={isContinueModalOpen} />
      <IntroModal isModalOpen={isIntroModalOpen} />
      <div className="flex flex-col items-center">
        <div className="mt-10 h-60 w-full text-center">
          <Graph />
        </div>
        <div className={styles.resetContainer}>
          <button className={styles.resetButton} onClick={reset}>
            start from scratch
          </button>
        </div>
        <Form />
      </div>
    </CreatePageContext>
  );
}
