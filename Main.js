import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function Main() {
  const db = useSQLiteContext();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Expo + SQLite Task List</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111827' },
  heading: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 16 },
});

useEffect(() => {
  async function setup() {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
      );
    `);

    loadTasks();
  }

  setup();
}, []);

const loadTasks = async () => {
  const rows = await db.getAllAsync(
    'SELECT * FROM tasks ORDER BY id DESC;'
  );
  setTasks(rows);
};

