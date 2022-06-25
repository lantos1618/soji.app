<script lang="ts">
    import { todos } from "./store";
    import type { iTodo } from "./store";

    function toggle(id: number) {
        todos.update((todo) => {
            const index = todo.findIndex((t) => t.id === id);
            if (index === -1) return todo;
            const newTodo = { ...todo[index], done: !todo[index].done };
            return [...todo.slice(0, index), newTodo, ...todo.slice(index + 1)];
        });
    }

    let _todos: iTodo[] = [];

    const unsubscribe = todos.subscribe((todos) => {
        _todos = todos;
    });
</script>

<div>
    <ul>
        {#each _todos as todo}
            <li>
                <input
                    type="checkbox"
                    checked={todo.done}
                    on:click={() => toggle(todo.id)}
                />
                <span>{todo.title}</span>
            </li>
        {/each}
    </ul>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
    }
</style>