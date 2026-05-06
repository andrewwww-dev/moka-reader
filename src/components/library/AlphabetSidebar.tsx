const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function AlphabetSidebar() {
  return (
    <div className="fixed right-3 top-1/2 hidden -translate-y-1/2 flex-col gap-1 text-xs text-text-muted xl:flex">
      {letters.map((letter) => (
        <a key={letter} href={`#${letter}`} className="rounded px-1 hover:text-accent-purple">
          {letter}
        </a>
      ))}
    </div>
  );
}
