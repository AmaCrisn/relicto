import Link from "next/link";

export default function footer() {
    const H1 = ({ children }) => <h1 className="font-extrabold tracking-widest mb-4">{children}</h1>;
    const P = ({ children }) => <Link href={"#"} className="text-sm mb-2 hover:text-accent">{children}</Link>;
    const Card = ({ children, className = "" }) => (
        <div className={`flex flex-col p-2 border-dashed border-2 rounded-2xl ${className}`}>
            {children}
        </div>
    );

    return (
        <div className="bg-accent-foreground">
            <div className="max-w-7xl w-full px-8 pt-8 pb-20 mx-auto flex flex-col text-white">
                <div className="grid grid-cols-4 gap-y-4 gap-x-5 mb-12">
                    <Card className="border-accent-foreground">
                        <H1>Relicto</H1>
                        <P>Tentang Relicto</P>
                        <P>Promo Hari Ini</P>
                    </Card>
                    <Card className="border-accent-foreground">
                        <H1>Bantuan dan Panduan</H1>
                        <P>Syarat dan Ketentuan</P>
                        <P>Kebijakan Privasi</P>
                        <P>Kebijakan Pengembalian & Pengembalian Dana</P>
                    </Card>
                    <Card className="border-accent-foreground">
                        <H1>Metode Pembayaran</H1>
                        <div className="grid grid-cols-3 gap-x-4">
                            <P>BCA</P>
                            <P>Mandiri</P>
                            <P>BRI</P>
                            <P>BNI</P>
                            <P>Ovo</P>
                            <P>GoPay</P>
                            <P>ShopeePay</P>
                            <P>DANA</P>
                            <P>QRIS</P>
                        </div>
                    </Card>
                    <Card className="flex flex-col items-center border-accent">
                        <H1>Hubungi Kami</H1>
                        <P>WhatsApp</P>
                        <P>Instagram</P>
                        <P>Facebook</P>
                        <P>X</P>
                    </Card>
                </div>

                <div className="flex items-center justify-between text-muted pt-6 px-4
                border-t-2 border-accent border-dotted">
                    <div className="flex gap-4 items-center">
                        <img
                            src="/icon.svg"
                            alt="Relicto"
                            className="object-contain size-16"
                        />
                        <p className="font-bold text-2xl text-white">Relicto</p>
                    </div>
                    <p>
                        © 2026-{new Date().getFullYear()} Relicto.
                    </p>
                </div>
            </div>
        </div>
    );
}