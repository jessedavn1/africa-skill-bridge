
-- Add 'parent' role
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'parent';

-- Talent signals: tracked engagement events that feed talent analysis
CREATE TABLE IF NOT EXISTS public.talent_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category TEXT NOT NULL, -- art, music, leadership, entrepreneurship, storytelling, design, technology, programming, business, public_speaking, writing, engineering, creativity, problem_solving, communication, innovation
  signal_type TEXT NOT NULL, -- 'tutor_question','project_built','challenge_joined','idea_shared','quiz_completed','time_spent'
  weight INT NOT NULL DEFAULT 1,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.talent_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own signals all" ON public.talent_signals FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_talent_signals_user_cat ON public.talent_signals(user_id, category);

-- Talent profile: aggregated AI insight
CREATE TABLE IF NOT EXISTS public.talent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  top_talents JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{category, score, summary}]
  growth_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  career_paths JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own talent profile all" ON public.talent_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Innovation projects
CREATE TABLE IF NOT EXISTS public.innovation_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- startup, art, social_impact, tech, design, content
  status TEXT NOT NULL DEFAULT 'idea', -- idea, building, launched
  is_public BOOLEAN NOT NULL DEFAULT false,
  ai_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.innovation_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own projects manage" ON public.innovation_projects FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public projects viewable" ON public.innovation_projects FOR SELECT TO authenticated USING (is_public = true);

-- Achievements / badges
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge TEXT NOT NULL, -- creator, innovator, leader, communicator, builder, entrepreneur, etc
  label TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own achievements all" ON public.achievements FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Parent <-> child links (parent monitors a student)
CREATE TABLE IF NOT EXISTS public.parent_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL,
  student_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(parent_id, student_id)
);
ALTER TABLE public.parent_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parent manages own links" ON public.parent_links FOR ALL TO authenticated
  USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Student views own parent links" ON public.parent_links FOR SELECT TO authenticated
  USING (auth.uid() = student_id);

-- Parents can read linked students' progress, signals, talent profile
CREATE POLICY "Parents read linked progress" ON public.progress FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.parent_links pl WHERE pl.parent_id = auth.uid() AND pl.student_id = progress.user_id));
CREATE POLICY "Parents read linked signals" ON public.talent_signals FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.parent_links pl WHERE pl.parent_id = auth.uid() AND pl.student_id = talent_signals.user_id));
CREATE POLICY "Parents read linked talent profile" ON public.talent_profiles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.parent_links pl WHERE pl.parent_id = auth.uid() AND pl.student_id = talent_profiles.user_id));
CREATE POLICY "Parents read linked achievements" ON public.achievements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.parent_links pl WHERE pl.parent_id = auth.uid() AND pl.student_id = achievements.user_id));
