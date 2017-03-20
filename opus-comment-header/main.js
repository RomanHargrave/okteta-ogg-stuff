function init() {
    var struct_user_comment = struct({
        length:     uint32(),

        /* According to the specifications for vorbis-comment,
         * this should be UTF-8 encoded, but the only examples I have are ASCII encoded.
         *
         * WTF
         */
        comment:    string('ASCII').set({
            maxByteCount: 0,
            updateFunc: function () { this.maxByteCount = this.parent.length.value; }
        })
    });

    struct_user_comment.name = "Comment";

    var structure = struct({
        capture_pattern:            array(char(), 8),

        /* vorbis-comment */
        vendor_length:              uint32(),
        vendor_string:              array(char(), function (_struct) { return _struct.vendor_length.value; }),

        user_comment_list_length:   uint32(),
        user_comment_list:          array(struct_user_comment, function (_struct) { return _struct.user_comment_list_length.value })
    });

    structure.name = "OpusTags";

    return structure;
};
