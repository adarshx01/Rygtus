import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VirtualBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your virtual bot. How can I assist you today?",
      sender: "Bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "User",
    };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      let botReply = "I am not sure how to respond to that.";
      if (
        input.toLowerCase().includes("hello") ||
        input.toLowerCase().includes("hi")
      ) {
        botReply = "Hello! How can I help you?";
      } else if (input.toLowerCase().includes("help")) {
        botReply = "Sure! Let me know what you need help with.";
      }
      const botMessage = {
        id: messages.length + 2,
        text: botReply,
        sender: "Bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>3D bot</Text>
      </View>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={
              msg.sender === "Bot" ? styles.botMessage : styles.userMessage
            }
          >
            <Text
              style={msg.sender === "Bot" ? styles.botText : styles.userText}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 10,
  },
  chatContainer: { flex: 1, paddingHorizontal: 10 },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e5ea",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
  },
  botText: { color: "#333", fontSize: 16 },
  userText: { color: "white", fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  sendButton: { padding: 10, backgroundColor: "#007bff", borderRadius: 25 },
});
