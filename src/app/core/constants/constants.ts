export const constants = {
    CURRENT_TOKEN: "CURRENT_TOKEN"
};

const apiURL = "http://localhost:8080/api";

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiURL}/login`,
        logout: `${apiURL}/logout`
    },
    TodoEndpoint: {
        getAllTodos: `${apiURL}/todos`,
        addTodo: `${apiURL}/todos`,
        updateTodo: `${apiURL}/todos`
    }
}