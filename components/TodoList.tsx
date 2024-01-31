"use client";
import { Input } from "@/components/ui/input";
import { api } from "../app/_trpc/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { serverClient } from "../app/_trpc/server";
import toast from "react-hot-toast";
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
      <Input
        type="text"
        placeholder="some text"
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
      <ul>
        {getTodo.data.map((l) => {
          return <li key={l.id}>{l.content}</li>;
        })}
      </ul>
    </>
  );
}
