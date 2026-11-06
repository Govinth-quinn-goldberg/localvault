import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useRef, useEffect } from "react";
import {View,Text,Pressable,Alert,Platform,StyleSheet,FlatList,TextInput,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoteScreen() {
    const [notes, setNotes] = useState<{ id: string; title: string; content: string }[]>([]);
    const listRef = useRef<FlatList>(null);
    const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("localvault_notes");

      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.log("Error loading notes:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  loadNotes();
}, []);

useEffect(() => {
  const saveNotes = async () => {
    if (!isLoaded) return;

    try {
      await AsyncStorage.setItem(
        "localvault_notes",
        JSON.stringify(notes)
      );
    } catch (error) {
      console.log("Error saving notes:", error);
    }
  };

  saveNotes();
}, [notes, isLoaded]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Not assigned yet",
      content: "",
    };
    setNotes((currentNotes) => [newNote, ...currentNotes]);
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };
    const updateNoteTitle = (id: string, newTitle: string) => {
        setNotes((currentNotes) =>currentNotes.map((note) =>note.id === id ? { ...note, title: newTitle } : note));
    };
    const updateNoteContent = (id: string, newContent: string) => {
        setNotes((currentNotes) =>currentNotes.map((note) =>note.id === id ? { ...note, content: newContent } : note));
    };
    const deleteNote = (id: string) => {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== id)
  );
};
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>

            {/* Fixed heading */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>My Notes</Text>
                    <Text style={styles.subtitle}>
                        Your thoughts, all in one place
                    </Text>
                </View>
            </View>

            <FlatList
                ref={listRef}
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    // <View style={styles.noteCard}>
                    //     <Text style={styles.noteTitle}>{item.title}</Text>
                    //     <Text style={styles.noteContent}>{item.content || "No content yet"}</Text>
                    // </View>
                    <View style={styles.noteCard}>
                        <TextInput style={styles.noteTitle} value={item.title} placeholder="Note title" placeholderTextColor="#777777" onChangeText={(text) => updateNoteTitle(item.id, text)}/>
                        <TextInput style={styles.noteContent} value={item.content} placeholder="Start writing..." placeholderTextColor="#777777" multiline onChangeText={(text) => updateNoteContent(item.id, text)}/>
                        <Pressable style={styles.deleteButton}onPress={() => deleteNote(item.id)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>
                    </View>
                )}
                ListFooterComponent={
                    <Pressable
                        style={styles.addButton}
                        onPress={addNote}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </Pressable>    
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08090D",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    marginBottom: 24,
  },

  heading: {
    color: "#FF526B",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },

  subtitle: {
    color: "#85858F",
    fontSize: 14,
    marginTop: 6,
  },

  listContent: {
    paddingBottom: 30,
  },

  // Note card
  noteCard: {
    backgroundColor: "#14151B",
    padding: 15,
    borderRadius: 17,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#49202B",
    borderLeftWidth: 3,
    borderLeftColor: "#FF304F",

    shadowColor: "#FF1744",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 9,

    elevation: 3,
  },

  // Title input
  noteTitle: {
    color: "#FF526B",
    fontSize: 18,
    fontWeight: "600",

    backgroundColor: "transparent",
    padding: 0,
    marginBottom: 8,
    includeFontPadding: false,
  },

  // Content input
  noteContent: {
    color: "#B8B8C2",
    fontSize: 14,
    lineHeight: 21,

    backgroundColor: "transparent",
    padding: 0,
    paddingTop: 5,

    minHeight: 90,
    maxHeight: 180,
    textAlignVertical: "top",
    includeFontPadding: false,
  },

  // Add button
  addButton: {
    width: 58,
    height: 58,
    backgroundColor: "#FF304F",
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    marginTop: 12,
    marginBottom: 20,

    shadowColor: "#FF1744",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,

    elevation: 7,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "300",
  },

  // Delete button
  deleteButton: {
    alignSelf: "flex-end",
    marginTop: -20,

    paddingVertical: 8,
    paddingHorizontal: 15,

    backgroundColor: "#361726",
    borderRadius: 9,

    borderWidth: 1,
    borderColor: "#762638",
  },

  deleteButtonText: {
    color: "#FF526B",
    fontSize: 13,
    fontWeight: "600",
  },
});