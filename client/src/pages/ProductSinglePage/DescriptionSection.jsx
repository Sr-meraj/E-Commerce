import ReviewSection from "./ReviewSection";

const DescriptionSection = ({ data }) => {

    return (
        <>
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="Product_tab" role="tab" className="tab !w-max checked:font-bold h-9" aria-label="DESCRIPTION" defaultChecked />

                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

                    {data?.description}
                </div>

                <input type="radio" name="Product_tab" role="tab" className="tab !w-max checked:font-bold h-9 font-semibold" aria-label="ADDITIONAL INFO" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="space-y-3">

                        <h3 className="card-title mb-3">
                            Packaging & Delivery
                        </h3>
                        <p>
                            Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.
                        </p>

                        <p>
                            Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers outgrew lugubrious luridly irrationally attractively dachshund.
                        </p>
                    </div>
                </div>

                <input type="radio" name="Product_tab" role="tab" className="tab !w-max font-semibold checked:font-bold h-9" aria-label="REVIEWS (3)" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <ReviewSection />
                </div>
            </div>
        </>
    );
}
export default DescriptionSection;