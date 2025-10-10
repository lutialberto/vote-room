import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  RefreshControl, 
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoomCardItem from '@/components/RoomCardItem';
import { Room } from '../../models/Room';
import { fetchRooms } from '../../services/room/roomService';
import RoomStats, { ROOM_STATS, RoomStatNames } from '@/components/RoomStats';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyRooms() {
  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedStats, setSelectedStats] = useState<RoomStatNames | undefined>(undefined);

  const roomsBySelectedStat = selectedStats
    ? rooms.filter(room => ROOM_STATS[selectedStats].criteria(room))
    : rooms;

  useEffect(() => {
    const fetchRooms2 = () => {
      fetchRooms()
        .then(res => setRooms(res));
    };

    fetchRooms2();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
      fetchRooms()
        .then(res => {
          setRooms(res)
          setRefreshing(false);
        });
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <View style={styles.header}>
          <ThemedText type="title">
            🏠 Mis Salas
          </ThemedText>
          <ThemedText type='subtitle' style={styles.pageSubtitle}>
            Salas donde eres miembro o propietario
          </ThemedText>
        </View>

        <FlatList
          data={roomsBySelectedStat}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.code}
          renderItem={({ item }) => <RoomCardItem {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={
            <RoomStats 
              rooms={rooms} 
              selectedStats={selectedStats}
              handleSelectedStatsItemPress={item => setSelectedStats(prev => prev === item ? undefined : item)} 
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#007AFF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="home-outline" size={80} color="#ccc" />
              <ThemedText>
                No tienes salas aún
              </ThemedText>
              <ThemedText style={styles.emptyDescription}>
                Crea una nueva sala o únete a una existente para comenzar
              </ThemedText>
            </View>
          }
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  pageSubtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyDescription: {
    opacity: 0.7,
    textAlign: 'center',
  },
});