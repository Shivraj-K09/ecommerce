export function CheckoutLoading() {

    return (
        <div className="h-screen w-screen bg-background flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-px bg-foreground" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    LOADING CHECKOUT
                </p>
            </div>
        </div>
    );
}

