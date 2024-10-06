import Results from "@/components/Result";

export const metadata = {
    title: 'RESULTS',
    description: 'SECUSIM SIMULATION RESULTS',
}

export default function ResultPage() {
    return (
        <div className='font-montserrat text-stone-600'>
            <Results />
        </div>
    );
};