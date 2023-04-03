import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import useFetch from '../../../hook/useFetch'

const Nearbyjobs = () => {

  const router = useRouter();

  const {data, isLoading, error} = useFetch(
    'search',
    {
      query: 'React developer',
      num_pages: 1,
    }
  );

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary}/>
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data?.map((job) => (
              <NearbyJobCard 
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleCardPress={handleCardPress}
              />
            ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs