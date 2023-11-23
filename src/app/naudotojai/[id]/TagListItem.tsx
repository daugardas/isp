import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import { Zymes } from "@prisma/client";
import { useEffect, useState } from "react";

type Props = {
    tag: Zymes;
    handleSelectTagButtonClick: (id: number) => void;
    setErrorMessage: (message: string) => void;
    changeTagName: (id: number, tagName: string) => void;
    deleteTag: (id: number) => void;
};

export default function TagListItem({
    tag,
    handleSelectTagButtonClick,
    setErrorMessage,
    changeTagName,
    deleteTag,
}: Readonly<Props>) {
    const [tagName, setTagName] = useState(tag.zyme);
    const [showEditTagInput, setShowEditTagInput] = useState(false);

    useEffect(() => {
        setTagName(tag.zyme);
    }, [tag]);

    const handleInputOnKeyDown = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            setShowEditTagInput(false);
            updateTagName();
        }
    };

    const updateTagName = async () => {
        try {
            const response = await fetch("/api/tags/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tagId: tag.id, tagName }),
            });

            if (!response.ok) {
                const data = (await response.json()) as { message: string };
                console.log(data.message);
                setErrorMessage(data.message);
                return;
            }

            const data = (await response.json()) as { tag: Zymes };
            //setTagName(data.tag.zyme);
            changeTagName(data.tag.id, data.tag.zyme);
            setShowEditTagInput(false);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error);
        }
    };

    return (
        <li className="bg-zinc-950 hover:bg-zinc-900 w-full flex items-center px-1 py-1">
            {showEditTagInput ? (
                <input
                    className={`focus:border outline-none w-full bg-zinc-950 text-white px-2 py-1`}
                    type="text"
                    name="newTag"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    onKeyDown={handleInputOnKeyDown}
                    placeholder="Įveskite žymę"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        handleSelectTagButtonClick(tag.id);
                    }}
                    className="px-2 py-1 w-full "
                >
                    {tagName}
                </button>
            )}

            {showEditTagInput ? (
                <button
                    type="button"
                    className="w-5 h-fit text-yellow-500 hover:text-yellow-600"
                    onClick={() => {
                        setShowEditTagInput(false);
                        updateTagName();
                    }}
                >
                    <SaveIcon />
                </button>
            ) : (
                <>
                    <button
                        type="button"
                        className="w-7 h-fit text-yellow-500 hover:text-yellow-600"
                        onClick={() => setShowEditTagInput(true)}
                    >
                        <EditIcon />
                    </button>

                    <button
                        type="button"
                        className="w-7 h-fit text-red-500 hover:text-red-600"
                        onClick={() => {
                            deleteTag(tag.id);
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </>
            )}
        </li>
    );
}
