import { FC, FormEvent } from "react";

interface AddCollectionFormProps {
  handleSubmit: (e: FormEvent) => void;
  collectionName: string;
  setCollectionName: (value: string) => void;
}

const AddCollectionForm: FC<AddCollectionFormProps> = ({ handleSubmit, collectionName, setCollectionName }) => {
  return (
    <form className={"border-2 border-pink-700 p-4 flex flex-col gap-3 rounded-lg"} onSubmit={handleSubmit}>
      <h3>No Collection Found 🥺 </h3>
      <input
        type={"text"}
        className={"px-3 py-2 border border-pink-800 rounded-lg"}
        placeholder={"Collection Name"}
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <button type={"submit"} className={"bg-pink-800 rounded-lg px-3 py-2 w-fit text-white"}>
        Add Collection
      </button>
    </form>
  );
};

export default AddCollectionForm;
