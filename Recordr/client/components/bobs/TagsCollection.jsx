// import to make


const RenderTag = (data) => {
    const { draft, sent, paid, deleted } = data;

    const DraftTag = () => {
        // svg for tag
    };

    const SentTag = () => {
        // svg for tag
    };

    const PaidTag = () => {
        // svg for tag
    };

    const DeletedTag = () => {
        // svg for tag
    };

// make overdue tag?

    const ChoosenTag = () => {
        switch (true) {
            case draft: return <DraftTag />
            case sent: return <SentTag />
            case paid: return <PaidTag />
            case deleted: return <DeletedTag />
            return {
                // TBD
            }
        }
    
    }

    return (
        <View>
            <ChoosenTag />
        </View>
    )

};

export default RenderTag;
