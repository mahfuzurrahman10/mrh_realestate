import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Property from '../components/Property';

const Banner = ({purpose,imageUrl,desc1,desc2,title1,title2,buttonText,linkName})=> (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium" paddingBottom="10">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br/>{title2}
      </Text>
      <Text fontSize="lg" color="gray.700" paddingBottom="3" paddingTop="3">
        {desc1} <br />{desc2}
      </Text>
      <Button fontSize="xl" >  
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
)
export default function Home({propertiesForSale, propertiesForRent}) {

  console.log(propertiesForRent,propertiesForSale);
  return (
    <Box>
      <Banner 
        purpose="RENT A HOME"
        title1 ="Rental Homes for"
        title2 ="Everyone"
        desc1="Explore Apartment, Villas, Homes"
        desc2=" and more"
        linkName="/search?purpose=for-rent"
        buttonText="Explore Renting"
        imageUrl ="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {/* Fetch the rent properties and map over them */}
        {propertiesForRent.map((property)=><Property property={property} key={property.id}/>)}
      </Flex>
      <Banner 
        purpose="BUY A HOME"
        title1 ="Find, Buy & Own your"
        title2 ="Dream Home"
        desc1="Explore Apartment, Villas, Homes"
        desc2=" and more"
        linkName="/search?purpose=for-sale"
        buttonText="Explore Buying"
        imageUrl ="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {/* Fetch the sale properties and map over them */}
        {propertiesForSale.map((property)=><Property property={property} key={property.id}/>)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale:propertyForSale?.hits,
      propertiesForRent:propertyForRent?.hits,
    }
  }
}
