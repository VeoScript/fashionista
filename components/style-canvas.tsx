import { useEffect, useState } from "react";
import { View } from "react-native";
import uuid from "react-native-uuid";
import DraggableItem from "./draggable-item";

interface Item {
  id: string;
  uri: string;
}

interface StyleCanvasProps {
  addTrigger?: string | null;
  clearTrigger?: boolean;
  onClearHandled?: () => void;
  onItemsChange?: (uris: string[]) => void;
}

export default function StyleCanvas({
  addTrigger,
  clearTrigger,
  onClearHandled,
  onItemsChange,
}: StyleCanvasProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (addTrigger) {
      const newItem = { id: uuid.v4(), uri: addTrigger };
      setItems((prev) => {
        const updated = [...prev, newItem];
        onItemsChange?.(updated.map((item) => item.uri));
        return updated;
      });
    }
  }, [addTrigger, onItemsChange]);

  useEffect(() => {
    if (clearTrigger) {
      setItems([]);
      onClearHandled?.();
      onItemsChange?.([]);
    }
  }, [clearTrigger, onClearHandled, onItemsChange]);

  const handleDelete = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      onItemsChange?.(updated.map((item) => item.uri));
      return updated;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          uri={item.uri}
          onDelete={handleDelete}
        />
      ))}
    </View>
  );
}
