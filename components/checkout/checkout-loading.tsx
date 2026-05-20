export function CheckoutLoading() {
  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-foreground h-px w-8" />
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
          LOADING CHECKOUT
        </p>
      </div>
    </div>
  );
}
