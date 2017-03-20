function init() {
    var structure = struct({
        capture_pattern:        array(char(), 8),
        version:                uint8(),
        channel_count:          uint8(),
        pre_skip:               uint16(),
        sample_rate:            uint32(),
        output_gain:            int16(),
        channel_mapping_family: uint8(),

        channel_map: struct({
            stream_count:           uint8(),
            dual_chan_stream_count: uint8(),
            channel_mapping:        array(uint8(), function (_struct) { return _struct.channel_count.value; })
        })
    });

    structure.byteOrder = "littleEndian";
    structure.name      = "OpusHead";

    return structure;
};
