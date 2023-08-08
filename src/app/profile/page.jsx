"use client";

import React from "react";
import { CustomContext } from "../context/Context";
import { useState } from "react";
import { db } from "../config/FireConfig";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  let [NoteTitle, setNoteTitle] = useState("");
  let [NoteDescription, setNoteDescription] = useState("");

  let { currentUser, Signout } = CustomContext();

  const userDocRef = doc(db, "users", `${currentUser?.email}`);

  const addNotes = async () => {
    try {
      await updateDoc(userDocRef, {
        addedNotes: arrayUnion({
          title: NoteTitle,
          description: NoteDescription,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-3">
        <div className="font-bold">
          Welcome <span> {currentUser?.displayName} </span>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => Signout()}
        >
          Log out
        </button>
      </div>

      <form action="">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="title"
            value={NoteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={NoteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => addNotes()}
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default Profile;
