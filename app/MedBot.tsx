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
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MedBot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am MedBot. How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "I'm here to help!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={{ uri: "https://example.com/health-background.jpg" }}
        style={styles.background}
      >
        <Text style={styles.header}>MedBot</Text>
        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text
                style={msg.sender === "user" ? styles.userText : styles.botText}
              >
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={[
            styles.inputContainer,
            inputFocused && styles.inputContainerFocused,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 15,
  },
  chatContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  message: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderBottomRightRadius: 0,
  },
  botMessage: { backgroundColor: "#e1e5ea", borderBottomLeftRadius: 0 },
  userText: { color: "white", fontSize: 16 },
  botText: { color: "#333", fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainerFocused: {
    bottom: 10,
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
