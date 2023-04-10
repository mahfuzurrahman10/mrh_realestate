import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "@/components/SearchFilters";
import Property from "@/components/Property";
import noresult from '../assets/images/AY2.svg';
import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                fontWeight="black"
                padding="2"
                alignItems="center"
                justifyContent="center"
                fontSize="lg"
                onClick={()=> setSearchFilters((prevFilters)=>!prevFilters)}
            >
                <Text>
                    search by properties
                </Text> 
                <Icon paddingLeft="2" width="7" as={BsFilter}/>     
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property)=> <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length===0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt="noresult" src={noresult}/>
                    <Text fontSize="2xl" marginTop="3">
                        No Results Found
                    </Text>
                </Flex>
            )}
        </Box>
    );
}

export default Search;


export async function getServerSideProps({ query }){
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const maxPrice = query.maxPrice || '1000000';
    const minPrice = query.minPrice || '0';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';


    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&roomsMin=${roomsMin}&maxPrice=${maxPrice}&minPrice=${minPrice}&areaMax=${areaMax}&rentFrequency=${rentFrequency}&sort=${sort}`);
    return {
      props: {
        properties: data?.hits,
      }
    }
  }
  