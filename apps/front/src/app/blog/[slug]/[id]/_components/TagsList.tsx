import { TagEntity } from "server/dist/src/tag/entities/tag.entity";

type Props = {
  tags: TagEntity[]
};

function TagsList({ tags }: Props) {
  return (
    <div className="flex justify-end">{ tags.map(tag => (
      <p className="bg-emerald-400 px-3 ml-2 rounded-md" key={ tag.id }>{ tag.name }</p>
    ))
    }</div>
  );
}

export default TagsList;