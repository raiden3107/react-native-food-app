import react, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import yelp from "../api/yelp";

const ResultShow = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const id = navigation.getParam("id");

  const searchDetail = async (id) => {
    setLoading(true);
    try {
      const response = await yelp.get(`/${id}`);
      setResult(response.data);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDetail(id);
  }, []);

  if (loading) {
    return <ActivityIndicator size={90} style={styles.loaderStyle} />;
  }

  return (
    <View style={styles.container}>
      {error.length > 0 && <Text>{error}</Text>}
      <FlatList
        data={result.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image style={styles.imageStyle} source={{ uri: item }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 250,
    height: 200,
    marginBottom: 5,
    borderRadius: 5,
    alignSelf: "center",
  },
  loaderStyle: {
    marginTop: 200,
  },
  container: {
    marginTop: 10,
  },
});

export default ResultShow;
