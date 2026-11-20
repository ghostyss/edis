import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML, { type MixedStyleRecord } from "react-native-render-html";
import { Feather } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { useAppTheme } from "../../hooks/useAppTheme";
import { GetDataService } from "../../services/GetDataService";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Banner from "../../dashboard/screens/Banner";

type Props = NativeStackScreenProps<RootStackParamList, "Material">;
type Chapter = {
  id: string;
  nametemplate: unknown;
  template: unknown;
  Name: string;
};

type RenderStyles = {
  tags: MixedStyleRecord;
  classes: MixedStyleRecord;
  ids: MixedStyleRecord;
};

function parseCssStyles(css: string): RenderStyles {
  const result: RenderStyles = { tags: {}, classes: {}, ids: {} };
  const rules = css.matchAll(/([^{}]+)\{([^{}]*)\}/g);

  for (const [, selectorsText, declarationsText] of rules) {
    const style: Record<string, string | number> = {};
    for (const declaration of declarationsText.split(";")) {
      const separator = declaration.indexOf(":");
      if (separator < 1) continue;
      const property = declaration.slice(0, separator).trim();
      let value = declaration
        .slice(separator + 1)
        .replace(/!important\s*$/, "")
        .trim();
      if (!property || !value || property.startsWith("--")) continue;

      const nativeProperty = property.replace(
        /-([a-z])/g,
        (_, letter: string) => letter.toUpperCase(),
      );
      const pixelValue = /^(-?\d+(?:\.\d+)?)px$/.exec(value);
      if (pixelValue) value = pixelValue[1];
      const numericValue = /^-?\d+(?:\.\d+)?$/.test(value)
        ? Number(value)
        : value;
      style[nativeProperty] = numericValue;
    }

    for (const selector of selectorsText
      .split(",")
      .map((item) => item.trim())) {
      if (/^[a-z][\w-]*$/i.test(selector)) {
        Object.assign((result.tags[selector.toLowerCase()] ??= {}), style);
      } else if (/^\.[\w-]+$/.test(selector)) {
        Object.assign((result.classes[selector.slice(1)] ??= {}), style);
      } else if (/^#[\w-]+$/.test(selector)) {
        Object.assign((result.ids[selector.slice(1)] ??= {}), style);
      }
    }
  }
  return result;
}

export default function Material({ navigation, route }: Props) {
  const { styles: appStyles, colors } = useAppTheme();
  const { width, height } = useWindowDimensions();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [controlsVisible2, setControlsVisible2] = useState(false);
  const [interaction, setInteraction] = useState(0);
  const [chapterMenuVisible, setChapterMenuVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [chapterIconTop, setChapterIconTop] = useState(12);
  const chapterIconDragStart = useRef(12);
  const [data1, setData1] = useState<Record<string, unknown>>({});
  const [materialHtml, setMaterialHtml] = useState("");
  const [materialStyles, setMaterialStyles] = useState<RenderStyles>({
    tags: {},
    classes: {},
    ids: {},
  });
  const [loading, setLoading] = useState(false);
  const [loadingMaterial, setLoadingMaterial] = useState(false);
  const materialRequestId = useRef(0);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null,
  );

  const chapters = useMemo(
    () =>
      Object.entries(data1)
        .map(([id, value]) => {
          const item = (value ?? {}) as Record<string, unknown>;
          return {
            id,
            nametemplate: item.nametemplate,
            template: item.template,
            Name: String(item.Name ?? ""),
          };
        })
        .sort((a, b) => {
          const orderOf = (name: string) => {
            const match = /^\s*(\d+)\./.exec(name);
            return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
          };
          return orderOf(a.Name) - orderOf(b.Name);
        }),
    [data1],
  );
  const selectedIndex = chapters.findIndex(
    (chapter) => chapter.id === selectedChapterId,
  );
  const selectedChapter = chapters[selectedIndex] ?? null;
  const chapterIconPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_event, gesture) =>
          Math.abs(gesture.dy) > 4,
        onPanResponderGrant: () => {
          chapterIconDragStart.current = chapterIconTop;
        },
        onPanResponderMove: (_event, gesture) => {
          const headerHeight = controlsVisible ? 60 : 0;
          const maxTop = Math.max(0, height - headerHeight - 48);
          setChapterIconTop(
            Math.min(
              maxTop,
              Math.max(0, chapterIconDragStart.current + gesture.dy),
            ),
          );
        },
      }),
    [controlsVisible, height],
  );

  useEffect(() => {
    if (!controlsVisible) return;
    const timer = setTimeout(() => setControlsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [controlsVisible, interaction]);

  useEffect(() => {
    let active = true;
    const loadChapters = async () => {
      setLoading(true);
      const response = await GetDataService.GetCourse(route.params.courseId);
      if (active && response.code === 200) {
        try {
          const parsed =
            typeof response.data1 === "string"
              ? JSON.parse(response.data1)
              : response.data1;
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            const chapterData = parsed as Record<string, unknown>;
            setData1(chapterData);
          }
        } catch (error) {
          console.error("No se pudo leer response.data1 como JSON:", error);
        }
      }
      if (active) setLoading(false);
    };
    void loadChapters();
    return () => {
      active = false;
    };
  }, [route.params.courseId]);

  const revealControls = () => {
    setControlsVisible(true);
    setInteraction((value) => value + 1);
  };

  const loadMaterial = async (chapter: Chapter) => {
    const requestId = ++materialRequestId.current;
    setLoadingMaterial(true);
    setMaterialHtml("");
    setBannerVisible(true);
    try {
      const response = await GetDataService.GetMaterial(chapter.id);
      if (requestId !== materialRequestId.current) return;
      if (response.code !== 200) return;

      let payload: unknown = response.data1;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload) as unknown;
        } catch {
          // Si no es JSON, response.data1 contiene directamente el HTML.
        }
      }
      if (typeof payload === "string") {
        setMaterialHtml(payload);
        if (payload.length > 0) setBannerVisible(false);
      } else if (payload && typeof payload === "object") {
        const material = payload as Record<string, unknown>;
        const content =
          typeof material.Content === "string" ? material.Content : "";
        setMaterialHtml(content);
        if (content.length > 0) setBannerVisible(false);
        const styles = material.Styles;
        if (typeof styles === "string") {
          setMaterialStyles(parseCssStyles(styles));
        } else if (
          styles &&
          typeof styles === "object" &&
          !Array.isArray(styles)
        ) {
          const styleObject = styles as Record<string, unknown>;
          setMaterialStyles({
            tags: (styleObject.tagsStyles ?? styles) as MixedStyleRecord,
            classes: (styleObject.classesStyles ?? {}) as MixedStyleRecord,
            ids: (styleObject.idsStyles ?? {}) as MixedStyleRecord,
          });
        }
      }
    } catch (error) {
      if (requestId === materialRequestId.current) {
        console.error("No se pudo cargar el contenido del capítulo:", error);
      }
    } finally {
      if (requestId === materialRequestId.current) setLoadingMaterial(false);
    }
  };

  const selectChapter = (chapter: Chapter) => {
    setSelectedChapterId(chapter.id);
    setChapterMenuVisible(false);
    setMaterialHtml("");
    setMaterialStyles({ tags: {}, classes: {}, ids: {} });
    revealControls();
    void loadMaterial(chapter);
  };

  const moveChapter = (direction: -1 | 1) => {
    const next = chapters[selectedIndex + direction];
    if (next) selectChapter(next);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {controlsVisible && (
        <View
          style={{
            height: 60,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver a Groups"
            hitSlop={10}
            onPress={() => navigation.goBack()}
            style={{ padding: 8, marginRight: 8 }}
          >
            <Feather name="arrow-left" size={22} color={colors.text} />
          </Pressable>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.text,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {route.params.courseName}
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View
          {...(!chapterMenuVisible ? chapterIconPanResponder.panHandlers : {})}
          style={{
            position: "absolute",
            top: chapterMenuVisible ? 0 : chapterIconTop,
            bottom: chapterMenuVisible ? 0 : undefined,
            left: chapterMenuVisible ? 0 : 12,
            zIndex: 2,
            width: chapterMenuVisible ? 280 : 44,
            height: chapterMenuVisible ? undefined : 44,
            maxWidth: "78%",
            backgroundColor: chapterMenuVisible
              ? colors.background
              : "transparent",
            borderRightWidth: chapterMenuVisible ? 1 : 0,
            borderRightColor: colors.border,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              chapterMenuVisible ? "Ocultar capítulos" : "Mostrar capítulos"
            }
            onPress={() => setChapterMenuVisible((visible) => !visible)}
            style={{
              height: 48,
              alignItems: chapterMenuVisible ? "flex-end" : "center",
              justifyContent: "center",
              paddingHorizontal: 12,
              backgroundColor: chapterMenuVisible ? colors.background : "#fff",
              borderRadius: chapterMenuVisible ? 0 : 24,
              borderBottomWidth: chapterMenuVisible ? 1 : 0,
              borderBottomColor: colors.border,
              elevation: chapterMenuVisible ? 0 : 4,
            }}
          >
            <Feather
              name={chapterMenuVisible ? "chevron-left" : "list"}
              size={22}
              color={colors.text}
            />
          </Pressable>

          {chapterMenuVisible &&
            (loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingSpinner />
              </View>
            ) : chapters.length === 0 ? (
              <Text style={{ color: colors.text, padding: 16 }}>
                No hay capítulos disponibles.
              </Text>
            ) : (
              <ScrollView>
                {chapters.map((chapter) => {
                  const selected = chapter.id === selectedChapterId;
                  return (
                    <Pressable
                      key={chapter.id}
                      onPress={() => selectChapter(chapter)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        backgroundColor: selected
                          ? colors.primary
                          : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          color: selected ? colors.buttontext : colors.text,
                        }}
                      >
                        {chapter.Name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            ))}
        </View>
        <Pressable
          onPress={() => {
            revealControls();

            if (selectedChapter && !materialHtml && !loadingMaterial) {
              void loadMaterial(selectedChapter);
            }
          }}
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#fff",
              position: "relative",
            }}
          >
            {bannerVisible && (
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Banner
                  Id={route.params.courseId}
                  imageStyle={appStyles.ImageBookMaterial}
                />
              </View>
            )}
            {selectedChapter && materialHtml.length > 0 && (
              <ScrollView
                style={{ flex: 1, zIndex: 1 }}
                contentContainerStyle={{ padding: 16 }}
                accessibilityLabel={`Contenido del capítulo ${selectedChapter.Name}`}
              >
                <RenderHTML
                  contentWidth={Math.max(width - 32, 0)}
                  source={{ html: materialHtml }}
                  tagsStyles={materialStyles.tags}
                  classesStyles={materialStyles.classes}
                  idsStyles={materialStyles.ids}
                />
              </ScrollView>
            )}
            {loadingMaterial && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.35)",
                }}
              >
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            )}
          </View>
          {controlsVisible2 && (
            <View
              style={{
                position: "absolute",
                bottom: 20,
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: 36,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 28,
                backgroundColor: "rgba(0,0,0,0.72)",
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Capítulo anterior"
                disabled={selectedIndex <= 0}
                onPress={(event) => {
                  event.stopPropagation();
                  moveChapter(-1);
                }}
                style={{ padding: 8, opacity: selectedIndex <= 0 ? 0.4 : 1 }}
              >
                <Feather name="chevron-left" size={30} color="#fff" />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Capítulo siguiente"
                disabled={
                  selectedIndex < 0 || selectedIndex >= chapters.length - 1
                }
                onPress={(event) => {
                  event.stopPropagation();
                  moveChapter(1);
                }}
                style={{
                  padding: 8,
                  opacity:
                    selectedIndex < 0 || selectedIndex >= chapters.length - 1
                      ? 0.4
                      : 1,
                }}
              >
                <Feather name="chevron-right" size={30} color="#fff" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
