import Image from "next/image";
import TodoList from "@/components/TodoList";
import { serverClient } from "@/app/_trpc/server";

export default async function Todo() {
  const todos = await serverClient.test.getTodos();
  return (
    <section className="flex min-h-screen flex-col items-center justify-start space-y-3">
      <TodoList initialTodos={todos}></TodoList>
    </section>
  );
}
