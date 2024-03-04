"use client";
import { Input } from "@/components/ui/input";
import { api } from "../app/_trpc/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { serverClient } from "../app/_trpc/server";
import toast from "react-hot-toast";
import Link from "next/link";
export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient.test)["getTodos"]>>;
}) {
  const getTodo = api.test.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addTodo = api.test.addTodo.useMutation({
    onError: (err) => {
      const { data } = err;
      if (data?.ZodError?.formErrors) {
        toast.error(data.ZodError.formErrors[0]);
      }
    },
    onSuccess: () => {
      toast.success("Todo added");
    },
    onSettled: () => {
      getTodo.refetch();
    },
  });

  const [content, setContent] = useState<string>("");

  if (getTodo.isError) {
    return <div>{getTodo.error.message}</div>;
  }
  if (getTodo.isPending) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Input
          type="text"
          placeholder="請輸入留言"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Button
          variant={"default"}
          type="submit"
          onClick={() => {
            addTodo.mutate(content);
            setContent("");
          }}
          disabled={addTodo.isPending}
        >
          {addTodo.isPending ? "Saving..." : "Save"}
        </Button>
      </div>

      <ul className="mt-8">
        {getTodo.data.map((task) => {
          return (
            <li
              key={task.id}
              className="flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg"
            >
              <h2
                className={`text-lg capitalize ${
                  task.completed ? "line-through" : null
                }`}
              >
                {task.content}
              </h2>
              <div className="flex gap-6 items-center">
                <Link
                  href={`/tasks/${task.id}`}
                  className="btn btn-accent btn-xs"
                >
                  edit
                </Link>
                {/* <DeleteForm id={task.id} /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
