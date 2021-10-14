/**
 * Represents report feedback type.
 */
class FeedbackType {
    title;
    tag;
    icon;

    constructor(title, tag, icon) {
        this.title = title ?? "";
        this.tag = tag ?? "";
        this.icon = icon;
    }
}

export default FeedbackType;
