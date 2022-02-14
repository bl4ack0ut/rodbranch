import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { GalaxyGame } from "./GalayGame";
import { parseGraphObject } from "utils/query";

type ITokenListProps = {
  title: string;
  active: boolean;
  items: Array<{ id: string }>;
  selected: Array<{ id: string }>;
  toggleSelected: (item: any, selected: boolean) => void;
  stats?: { eonEarned: number; lastClaimTimestamp: number; eonPerFuel: number };
};
const TokenList: React.FunctionComponent<ITokenListProps> = ({
  title,
  active,
  items,
  selected,
  toggleSelected,
  stats,
}) => {
  const isItemSelected = (id: string) => !!selected.find((el) => el.id === id);

  const handleClick = (item: { id: string }) => {
    if (!active) return;
    toggleSelected(item, !isItemSelected(item.id));
  };

  // console.log("items", items);

  const LeftArrow = () => {
    // eslint-disable-next-line
    const { isFirstItemVisible } = React.useContext(VisibilityContext);

    return (
      <div className="relative" onClick={() => {}}>
        {/* <img src="/images/arrow-left.svg" alt="previous" style={{
          opacity: isFirstItemVisible ? 0 : 1,
          height:'100%',
          marginRight:'5px'
        }}/> */}
      </div>
    );
  };
  // eslint-disable-next-line
  const RightArrow = () => {
    // eslint-disable-next-line
    const { isLastItemVisible } = React.useContext(VisibilityContext);

    return (
      <div className="relative" onClick={() => {}}>
        {/* <img src="/images/arrow-right.svg" alt="next" style={{
          visibility: isLastItemVisible ? 0 : 1,
          height:'100%',
          marginLeft:'5px'
        }}/> */}
      </div>
    );
  };

  return (
    <div
      className="w-full"
      style={{
        border: "4px rgba(42,35,30,1.0) solid",
        borderTop: 0,
        borderRight: 0,
        padding: "2px",
        opacity: active ? "1.0" : "0.5",
      }}>
      <div className="text-red font-console">{title}</div>
      {items.length > 0 ? (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {items.map((item) => {
            return (
              <GalaxyGame
                galaxyGame={parseGraphObject(item)}
                // itemId={item.id} // NOTE: itemId is required for track items
                // title={item.id}
                key={item.id}
                onClick={() => handleClick(item)}
                selected={isItemSelected(item.id)}
                stats={stats}
              />
            );
          })}
        </ScrollMenu>
      ) : (
        <div className="text-red font-console text-xs">No Tokens</div>
      )}
    </div>
  );
};

export default TokenList;
