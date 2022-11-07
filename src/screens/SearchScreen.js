import react, { useEffect, useState } from "react";
import { Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import ResultList from "../components/ResultList";
import yelp from "../api/yelp";
import * as SplashScreen from 'expo-splash-screen';

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  const searchApi = async (searchTerm) => {
    setLoading(true)
    SplashScreen.preventAutoHideAsync();
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResult(response.data.businesses);
    } catch (error) {
      setError("Something went wrong");
    } finally{
      setLoading(false)
      await SplashScreen.hideAsync();
    }
  };

  const filterResultByPrice = (price) => {
    return result.filter((item) => item.price === price);
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  if(loading){
    return(
      <ActivityIndicator size={90} style={styles.loaderStyle}/>
    )
  }

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {error.length > 0 && <Text>{error}</Text>}
      <ScrollView>
        <ResultList
          title="Cost Effective"
          result={filterResultByPrice("$")}
        />
        <ResultList
          title="Bit Pricier"
          result={filterResultByPrice("$$")}
        />
        <ResultList
          title="Big Spender"
          result={filterResultByPrice("$$$")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    marginTop: 200
  }
})

export default SearchScreen;
