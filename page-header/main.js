function init() {
    var structure = struct({
        // 0...3
        capture_pattern:            array(char(), 4),
        // 4
        stream_structure_version:   uint8(),
        
        // 5
        /*----------------------------------------------*/
        /* header_type_flag */
        /* not much out here on this, and the documentation uses 1-indexed id's for this??? */ 
        continued_packet:           bitfield("bool",        1),
        first_page:                 bitfield("bool",        1),
        last_page:                  bitfield("bool",        1),
        _htf_unused_4:              bitfield("unsigned",    1),
        _htf_unused_5:              bitfield("unsigned",    1),
        _htf_unused_6:              bitfield("unsigned",    1),
        _htf_unused_7:              bitfield("unsigned",    1),
        _htf_unused_8:              bitfield("unsigned",    1),
        /*----------------------------------------------*/

        // 6...13
        abs_granule_pos:            int64(),
        // 14...17
        stream_serial:              uint32(),
        // 18...21
        page_sequence:              uint32(),
        // 22...25
        page_checksum:              uint32(),

        // 26
        page_segments:              uint8(),
        // 27...(page_segments)
        segment_table:              array(uint8(), function(_struct) { return _struct.page_segments.value; })
    });

    structure.byteOrder = "littleEndian";

    return structure;
};
