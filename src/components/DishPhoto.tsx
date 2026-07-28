type DishPhotoProps = {
  emoji: string;
  gradient: string;
  className?: string;
  emojiClassName?: string;
};

export default function DishPhoto({
  emoji,
  gradient,
  className = "",
  emojiClassName = "text-4xl",
}: DishPhotoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-inner ${className}`}
    >
      <span className={emojiClassName}>{emoji}</span>
    </div>
  );
}
