import ImageGrid from "@/components/frontpage/ImageGrid"
import Title from "@/components/frontpage/Title"


export default function Introduction() {
    return (
        <div className="sm:relative overflow-hidden bg-white">
            <div className="pb-80 pt-8 sm:pb-80 sm:pt-24">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6">
                    <Title />
                    <div className="flex justify-center sm:block">
                        <ImageGrid />
                    </div>
                </div>
            </div>
        </div>
    )
}
