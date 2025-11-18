import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  StyleProp,
  TextStyle,
} from 'react-native';

type Props = {
  children: string;
  textStyle?: StyleProp<TextStyle>;
};

// Lightweight Markdown renderer for RN: headings, lists (ul/ol), blockquotes,
// code blocks, inline code, bold/italic, links.
const MarkdownText: React.FC<Props> = ({children, textStyle}) => {
  const lines = (children || '').split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];

  const pushCode = () => {
    if (codeBuffer.length) {
      out.push(
        <View key={`code-${out.length}`} style={styles.codeBlock}>
          <Text style={styles.codeText}>{codeBuffer.join('\n')}</Text>
        </View>,
      );
      codeBuffer = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw ?? '';
    if (/^```/.test(line)) {
      if (inCode) {
        inCode = false;
        pushCode();
      } else {
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(line);
      return;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      out.push(
        <Text
          key={`h-${i}`}
          style={[styles.p, styles[`h${level}` as const], textStyle]}>
          {renderInline(text)}
        </Text>,
      );
      return;
    }

    // blockquote
    const bq = line.match(/^>\s?(.*)$/);
    if (bq) {
      out.push(
        <View key={`bq-${i}`} style={styles.blockQuote}>
          <Text style={[styles.p, textStyle]}>{renderInline(bq[1])}</Text>
        </View>,
      );
      return;
    }

    // list item
    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      out.push(
        <View key={`li-${i}`} style={styles.liRow}>
          <View style={styles.liDot} />
          <Text style={[styles.p, textStyle]}>{renderInline(li[1])}</Text>
        </View>,
      );
      return;
    }

    // ordered list item
    const oli = line.match(/^\s*(\d+)[\.)]\s+(.*)$/);
    if (oli) {
      out.push(
        <View key={`oli-${i}`} style={styles.liRow}>
          <Text style={[styles.p, styles.olIndex, textStyle]}>
            {oli[1]}.
          </Text>
          <Text style={[styles.p, textStyle]}>{renderInline(oli[2])}</Text>
        </View>,
      );
      return;
    }

    // paragraph / blank
    out.push(
      <Text key={`p-${i}`} style={[styles.p, textStyle]}>
        {renderInline(line)}
      </Text>,
    );
  });

  // inline `code`
  function renderInline(text: string) {
    if (!text) return null;
    // Tokenize common inline syntaxes
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|~~[^~]+~~|\[[^\]]+\]\([^\)]+\))/g;
    const segments = text.split(regex).filter(s => s !== undefined && s !== null);
    return segments.map((seg, idx) => {
      // inline code
      let m = seg.match(/^`([^`]+)`$/);
      if (m) return <Text key={idx} style={styles.inlineCode}>{m[1]}</Text>;

      // bold **text** or __text__
      m = seg.match(/^\*\*([^*]+)\*\*$/) || seg.match(/^__([^_]+)__$/);
      if (m) return <Text key={idx} style={styles.bold}>{m[1]}</Text>;

      // italic *text* or _text_
      m = seg.match(/^\*([^*]+)\*$/) || seg.match(/^_([^_]+)_$/);
      if (m) return <Text key={idx} style={styles.italic}>{m[1]}</Text>;

      // strikethrough ~~text~~
      m = seg.match(/^~~([^~]+)~~$/);
      if (m) return <Text key={idx} style={styles.strike}>{m[1]}</Text>;

      // link [text](url)
      m = seg.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (m) {
        const [, label, url] = m;
        return (
          <Text key={idx} style={styles.link} onPress={() => Linking.openURL(url)}>
            {label}
          </Text>
        );
      }

      return <Text key={idx}>{seg}</Text>;
    });
  }

  return <View>{out}</View>;
};

export default MarkdownText;

const styles = StyleSheet.create({
  p: {fontSize: 15, lineHeight: 22, color: '#1E1E1E'},
  h1: {fontSize: 22, fontWeight: '600'},
  h2: {fontSize: 20, fontWeight: '600'},
  h3: {fontSize: 18, fontWeight: '600'},
  h4: {fontSize: 17, fontWeight: '600'},
  h5: {fontSize: 16, fontWeight: '600'},
  h6: {fontSize: 15, fontWeight: '600'},
  liRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 8},
  liDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#666', marginTop: 8, marginRight: 8},
  olIndex: {width: 18, textAlign: 'right', marginRight: 8},
  codeBlock: {backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, marginVertical: 6},
  codeText: {fontFamily: 'monospace', fontSize: 14, color: '#1E1E1E'},
  inlineCode: {fontFamily: 'monospace', backgroundColor: '#EFEFEF', paddingHorizontal: 4, borderRadius: 4},
  bold: {fontWeight: '700'},
  italic: {fontStyle: 'italic'},
  strike: {textDecorationLine: 'line-through'},
  link: {color: '#2F7AE5', textDecorationLine: 'underline'},
  blockQuote: {borderLeftWidth: 3, borderLeftColor: '#D0D0D0', paddingLeft: 10, marginVertical: 6},
});
