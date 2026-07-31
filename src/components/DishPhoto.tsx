import Image from "next/image";

type DishPhotoProps = {
  name: string;
  emoji: string;
  gradient: string;
  imageUrl?: string | null;
  className?: string;
  emojiClassName?: string;
};

export default function DishPhoto({
  name,
  emoji,
  gradient,
  imageUrl,
  className = "",
  emojiClassName = "text-4xl",
}: DishPhotoProps) {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-full ${className}`}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="300px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-inner ${className}`}
      role="img"
      aria-label={name}
    >
      <span className={emojiClassName} aria-hidden="true">
        {emoji}
      </span>
    </div>
  );
}
