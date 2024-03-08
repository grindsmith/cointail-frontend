import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";

const NFTRenderer = (props) => {
  const { contract } = useContract(props.contractAddress);
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return <ThirdwebNftMedia metadata={nft.metadata} />;
}

export default NFTRenderer;