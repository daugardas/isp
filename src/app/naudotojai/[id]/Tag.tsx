"use client";
import NeutralButton from "@/components/NeutralButton";
import SubmitButton from "@/components/SubmitButton";
import { Zymes } from "@prisma/client";
import { useEffect, useState } from "react";
import TagListItem from "./TagListItem";

type Props = {
    currentTag: Zymes | undefined;
    availableTags: Zymes[];
    naudotojasId: number;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export default function Tag({
    currentTag,
    availableTags,
    naudotojasId,
    className,
    ...props
}: Props) {
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [showNewTagInput, setShowNewTagInput] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [tags, setTags] = useState<Zymes[]>([]);
    const [tagId, setTagId] = useState<number | undefined>();

    useEffect(() => {
        setTags(availableTags);
    }, [availableTags]);

    useEffect(() => {
        if (currentTag) {
            setTagId(currentTag.id);
        }
    }, [currentTag]);

    const handleInputOnKeyDown = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            try {
                const response = await fetch("/api/tags/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tagName: newTag }),
                });

                if (!response.ok) {
                    const data = (await response.json()) as { message: string };
                    setErrorMessage(data.message);
                    return;
                }

                const data = (await response.json()) as { tag: Zymes };
                setTags([...tags, data.tag]);
            } catch (error) {
                console.error(error);
                setErrorMessage(
                    "Įvyko klaida bandant sukurti žymę. Bandykite dar kartą."
                );
            }
            setShowNewTagInput(false);
        }
    };

    const handleSelectTagButtonClick = async (tagId: number) => {
        try {
            const response = await fetch("/api/naudotojai/tags/set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tagId, userIdToTag: naudotojasId }),
            });

            if (!response.ok) {
                const data = (await response.json()) as { message: string };
                setErrorMessage(data.message);
                return;
            }

            setTagId(tags.find((tag) => tag.id === tagId)?.id);
            setShowTagDropdown(false);
            setShowNewTagInput(false);
        } catch (error) {
            console.error(error);
            setErrorMessage(
                "Įvyko klaida bandant priskirti žymę. Bandykite dar kartą."
            );
        }
    };

    const changeTagName = (tagId: number, newTagName: string) => {
        setTags(
            tags.map((tag) => {
                if (tag.id === tagId) {
                    return { ...tag, zyme: newTagName };
                }
                return tag;
            })
        );

        setTagId(tagId);
    };

    const deleteTag = async (deleteTagId: number) => {
        try {
            if (deleteTagId === tagId) {
                setErrorMessage("Negalima ištrinti žymės, kuri yra priskirta.");
            }

            const response = await fetch("/api/tags/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tagId: deleteTagId }),
            });

            if (!response.ok) {
                const data = (await response.json()) as { message: string };
                setErrorMessage(data.message);
                return;
            }

            setTags(tags.filter((tag) => tag.id !== deleteTagId));
        } catch (error) {
            console.error(error);
            setErrorMessage(
                "Įvyko klaida bandant ištrinti žymę. Bandykite dar kartą."
            );
        }
    };

    const tag = tags.find((tag) => tag.id === tagId);

    return (
        <div className={`relative ${className ?? ""}`} {...props}>
            {errorMessage && (
                <div
                    className="absolute h-6 top-0 right-0 z-10 translate-x-full translate-y-1/4 cursor-pointer"
                    onClick={() => setErrorMessage("")}
                >
                    <div className="absolute left-1 top-0 w-4 h-4 transform translate-y-1/4 rotate-45 bg-red-600 "></div>
                    <div className="absolute top-0 left-3 bg-red-600 text-white z-20 py-1 px-2 w-max max-w-sm break-words">
                        {errorMessage}
                    </div>
                </div>
            )}
            {tag ? (
                <NeutralButton
                    type="button"
                    onClick={() => {
                        setShowTagDropdown(!showTagDropdown);
                        setShowNewTagInput(false);
                    }}
                    className={`px-1 py-0 text-sm w-24 ${
                        showTagDropdown ? "!bg-red-600 !hover:bg-red-700" : ""
                    }`}
                >
                    {showTagDropdown ? "Atšaukti" : tag.zyme}
                </NeutralButton>
            ) : (
                <SubmitButton
                    type="button"
                    onClick={() => {
                        setShowTagDropdown(!showTagDropdown);
                        setShowNewTagInput(false);
                    }}
                    className={`px-1 py-0 text-sm w-24 ${
                        showTagDropdown ? "bg-red-600 hover:bg-red-700" : ""
                    }`}
                >
                    {showTagDropdown ? "Atšaukti" : "Pridėti žymę"}
                </SubmitButton>
            )}
            <ul
                className={`absolute top-9 mx-auto flex flex-col items-center text-sm ${
                    showTagDropdown ? "" : "hidden"
                }`}
            >
                <li className="bg-yellow-500 hover:bg-yellow-600 w-full">
                    <input
                        className={` focus:border outline-none w-full bg-zinc-950 text-white px-2 py-1 ${
                            showNewTagInput ? "" : "hidden"
                        }`}
                        type="text"
                        name="newTag"
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleInputOnKeyDown}
                        placeholder="Įveskite žymę"
                    />
                    <button
                        type="button"
                        className={`px-2 py-1 w-full ${
                            showNewTagInput ? "hidden" : ""
                        }`}
                        onClick={() => {
                            setShowNewTagInput(true);
                        }}
                    >
                        Sukurti
                    </button>
                </li>
                {showTagDropdown &&
                    tags.map((tag) => (
                        <TagListItem
                            key={tag.id}
                            tag={tag}
                            handleSelectTagButtonClick={
                                handleSelectTagButtonClick
                            }
                            setErrorMessage={setErrorMessage}
                            changeTagName={changeTagName}
                            deleteTag={deleteTag}
                        />
                    ))}
            </ul>
        </div>
    );
}
