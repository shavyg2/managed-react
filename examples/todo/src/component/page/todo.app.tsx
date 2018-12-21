import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import ManagedReact from "managed-react";
import { Todo } from "../logic/todo";
import styled from "styled-components";
import { Colors, Space } from "../../theme/theme";
import { Motion, spring, presets } from "react-motion";
import { flatmap } from "../../lib/flatmap/flatmap";
import flat from "flat";
import { Layout } from "../../lib/layout/layout";
import { ContainerWarp, TextAreaWarp } from './Warp';


//#region style
const TodoContainer = styled.div`
  max-width: 700px;
  margin: auto;
  margin-top: ${Space.margin.large}px;
  min-height: 100vh;
`;

function _Menu(props) {
  const api = useContext(Todo.Context);
  return (
    <div {...props}>
      <Title>Todo</Title>{" "}
      <input type="submit" value="New Item" onClick={api.newTodo} />
    </div>
  );
}

const Menu = styled(_Menu)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input[type="submit"] {
    background-color: ${Colors.primary.dark};
    padding: ${Space.margin.small}px;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: ${Colors.primary.dark};
  display: inline-block;
`;

const Container = styled(Layout.View)`
  overflow: hidden;
`;

const TodoItemView = styled.div`
  background-color: ${Colors.primary.light};
  margin-top: ${Space.margin.small}px;
  padding: ${Space.margin.small}px;
`;

const TodoTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${Space.margin.medium}px;
`;

const TodoTitle = styled.h2`
  color: ${props =>
    props.selected ? Colors.attention.main : Colors.primary.main};
  cursor: pointer;
  margin-left: ${Space.margin.small}px;
`;

const Description = styled.textarea`
  display: block;
  margin: auto;
  width: 95%;
  margin-top: ${Space.margin.small}px;
  margin-bottom: ${Space.margin.small}px;
  border: none;
  border-radius: ${Space.margin.small}px;
  min-height: 100px;
`;

//#endregion

export function TodoApp({ path }) {



  const todo = useContext(Todo.Context);


  useEffect(() => {
    todo.newTodo();
  }, []);

  return (
    <TodoContainer>
      <Menu />
      <TodoList.View />
    </TodoContainer>
  );
}






const TodoList = ManagedReact.create({
  selected: ""
})

  .use({
    Todo
  })

  .logic((state, dispatch, service) => {
    const { Todo } = service;

    const api = {
      getTodos() {
        return Todo.getTodos();
      },
      onClick(id: string) {
        return () => {
          dispatch(state => {
            state.selected = id;
          })
        }
      },
      isSelected(id) {
        return state.selected === id;
      }
    };
    return api;
  })
  .build()

  .AsComponent(function TodoList(api) {
    return api.getTodos().map(todo => (
      <Layout.Provider>
        <TodoItem
          key={todo.id}
          todo={todo}
          selected={api.isSelected(todo.id)}
          onClick={api.onClick(todo.id)}
        />
      </Layout.Provider>
    ));
  });

function TodoItem({ todo, selected, onClick }) {
  let api = useContext(Todo.Context);
  const layout = useContext(Layout.Context);
  let { completed } = todo;




  const [containerStyle, updateStyle] = useState(() => {
    return prepare({
      opacity: 1,
      height: layout.getHeight()
    });
  });

  

  useEffect(
    () => {
      let style = prepare({
        opacity: 1,
        height: completed ? 0 : selected ? layout.getHeight() : 80
      });
      updateStyle(style);
    },
    [completed, selected, layout.ref]
  );





  const [textareaStyle, updateTextAreaStyle] = useState(() => {
    return prepare({
      opacity: 0,
      scale: 0
    });
  });


  useEffect(
    () => {
      let style = prepare({
        opacity: 1,
        scale: selected ? 1 : 0
      });
      updateTextAreaStyle(style);
    },
    [completed, selected, layout.ref]
  );

  return (
    <ContainerWarp
      defaultStyle={flat({
        opacity: 0,
        height: 0
      })}
      style={containerStyle}
    >
      <Motion>
        <Container onClick={onClick}>
          <TodoItemView>
            <TodoTitleContainer>
              <TodoTitle selected={selected}>{todo.title}</TodoTitle>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={api.Completed(todo)}
              />
            </TodoTitleContainer>
            <TextAreaWarp
              defaultStyle={{ opacity: 0, scale: 0 }}
              style={textareaStyle}
            >
              <Motion>
                <Description defaultValue={todo.description} />
              </Motion>
            </TextAreaWarp>
          </TodoItemView>
        </Container>
      </Motion>
    </ContainerWarp>
  );
}

const prepare = flatmap((key, value) => {
  switch (key) {
    case "opacity":
      return spring(value, presets.gentle);
    case "height":
      return spring(value, presets.wobbly);
    case "scale":
      return spring(value, {
        stiffness: 200,
        damping: 20
      });
    default:
      return value;
  }
});


