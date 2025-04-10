// @ts-nocheck
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { LazyLoadWrapper, FlexRowSpaceBetween } from "~/components";

interface ItemType {
  carbonOffset?: number;
  price?: number;
}

interface Props {
  item: ItemType;
  imgHeight?: string;
  cardStyles?: React.CSSProperties;
}
export const NFTCardDimension = { height: "300px", width: "300px" };

export const NFTCard: React.FC<Props> = ({
  imgHeight = "230px",
  item,
  cardStyles,
}) => {
  const history = useHistory();
  const { carbonOffset = 343, price = 475 } = item;
  return (
    <Card
      onClick={() => history.push("/marketplace/overview/certificate")}
      style={{ ...NFTCardDimension, ...cardStyles }}
    >
      <Box mt="5%" position="relative" display="flex" justifyContent="center">
        <LazyLoadWrapper dimension={{ width: "90%", height: imgHeight }}>
          {({ onLoad }) => (
            <img
              onLoad={onLoad}
              height="100%"
              width="100%"
              src={item?.images?.fixed_height_small?.webp}
              alt="loading..."
            />
          )}
        </LazyLoadWrapper>
      </Box>
      <Box alignSelf="center" p="4px">
        <FlexRowSpaceBetween p="5px 10px">
          <Typography component="p">{`${carbonOffset}g`}</Typography>
          <Typography component="p">{`${price} NANO`}</Typography>
        </FlexRowSpaceBetween>
      </Box>
    </Card>
  );
};
