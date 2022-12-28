import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

export const ItemTypes = {
  CARD: "card",
};

const DataMap = ({ data, setData }) => {
  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = data[dragIndex];
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedCard],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="hidden md:flex gap-x-8 w-full items-center text-base mb-4">
        <span className="w-[5%]">#</span>
        <span className="w-[57%]">Title</span>
        <span className="w-[10%] ">Author</span>
        <span className="w-[10%] text-right">Likes</span>
      </div>
      {data?.map((item, i) => (
        <Card entry={item} key={item.id} index={i} moveCard={moveCard} />
      ))}
    </DndProvider>
  );
};

export default DataMap;
