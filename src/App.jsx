import React, { Component } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
      filter: "all",
    };
  }

  updateInput(value) {
    this.setState({ userInput: value });
  }

  addItem() {
    if (this.state.userInput.trim() !== "") {
      const newItem = {
        id: Date.now(),
        value: this.state.userInput,
        completed: false,
      };

      this.setState({
        list: [...this.state.list, newItem],
        userInput: "",
      });
    }
  }

  deleteItem(id) {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const edited = prompt("Edit your task:");
    if (edited !== null && edited.trim() !== "") {
      todos[index].value = edited;
      this.setState({ list: todos });
    }
  };

  toggleComplete = (index) => {
    const list = [...this.state.list];
    list[index].completed = !list[index].completed;
    this.setState({ list });
  };

  getFilteredList() {
    const { list, filter } = this.state;
    if (filter === "done") return list.filter((i) => i.completed);
    if (filter === "notdone") return list.filter((i) => !i.completed);
    return list;
  }

  render() {
    const filteredList = this.getFilteredList();

    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.9)",
              borderRadius: 4,
              boxShadow: 8,
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                fontWeight="bold"
                gutterBottom
              >
                 To-Do List📋
              </Typography>

              {/* INPUT */}
              <Stack direction="row" spacing={2} mb={4}>
                <TextField
                  fullWidth
                  label="Add a task..."
                  variant="outlined"
                  value={this.state.userInput}
                  onChange={(e) => this.updateInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => this.addItem()}
                >
                  Add
                </Button>
              </Stack>

              {/* FILTER BUTTONS (FIXED SPACING) */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 2, mb: 4 }}
              >
                <Chip
                  label="All"
                  clickable
                  color={this.state.filter === "all" ? "primary" : "default"}
                  onClick={() => this.setState({ filter: "all" })}
                />
                <Chip
                  label="Done"
                  clickable
                  color={this.state.filter === "done" ? "success" : "default"}
                  onClick={() => this.setState({ filter: "done" })}
                />
                <Chip
                  label="Not Done"
                  clickable
                  color={this.state.filter === "notdone" ? "warning" : "default"}
                  onClick={() => this.setState({ filter: "notdone" })}
                />
              </Stack>

              {/* LIST */}
              <Stack spacing={2}>
                {filteredList.length === 0 && (
                  <Typography align="center" color="text.secondary">
                    No tasks found
                  </Typography>
                )}

                {filteredList.map((item, index) => (
                  <Card
                    key={item.id}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "0.2s",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    {/* LEFT */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Checkbox
                        checked={item.completed}
                        onChange={() => this.toggleComplete(index)}
                      />
                      <Typography
                        sx={{
                          textDecoration: item.completed
                            ? "line-through"
                            : "none",
                          color: item.completed ? "gray" : "black",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Stack>

                    {/* RIGHT */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="success"
                        onClick={() => this.editItem(index)}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}

export default App;